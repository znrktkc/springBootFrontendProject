import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  page = 0;
  totalElements = 30;
  pageNumber = 0;
  size = 10;
  name: any;
  description: any;
  detailDescription: any;
  sortType: any;
  sortField: any;
  externalPaging = true;

  constructor(private productService: ProductService) { }
  @ViewChild(NgxDatatableModule) 'table': NgxDatatableModule;
  rows = [];
  columns = [
    { prop: 'name' },
    { name: 'description' },
    { name: 'detailDescription' }
  ];

  ngOnInit(): void {
    this.externalPaging = true;
    this.getProductsWithFilter(this.name, this.description, this.detailDescription, this.page, this.sortType , this.sortField);
  }

  // tslint:disable-next-line:typedef
  getProductsWithFilter(name: string, description: string, detailDescription: string, page: any, sortType: string, sortField: string) {
    console.log('getProductsWithFilter method called.');
    this.productService.getProductsWithFilter(name, description, detailDescription, page, sortType, sortField).subscribe( products => {
      this.rows = products.data.content;
      this.totalElements = products.data.totalElements;
    });
    return this.rows;
  }

  // tslint:disable-next-line:typedef
  updateFilter(event: any) {
    this.getProductsWithFilter(this.name, this.description, this.detailDescription, this.page, this.sortType , this.sortField);
  }

  // tslint:disable-next-line:typedef
  onSort(event: any) {
    console.log('Sort Event called for sortType: ' + event.sorts[0].dir + ' and field: ' + event.sorts[0].prop);
    const sort = event.sorts[0];
    this.sortType = sort.dir;
    this.sortField = sort.prop;
    this.getProductsWithFilter(this.name, this.description, this.detailDescription, this.page, this.sortType , this.sortField);
  }
  // tslint:disable-next-line:typedef
  setPage(pageInfo: { offset: any; }){
    console.log('set page');
    this.page = pageInfo.offset;
    this.getProductsWithFilter(this.name, this.description, this.detailDescription, this.page, this.sortType , this.sortField);
  }

}
