import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  page: any;
  name: any;
  description: any;
  detailDescription: any;
  sortType: any;
  sortField: any;

  constructor(private productService: ProductService) { }
  @ViewChild(NgxDatatableModule) 'table': NgxDatatableModule;
  rows = [];
  columns = [];

  ngOnInit(): void {
    this.getProducts();
  }

  // tslint:disable-next-line:typedef
  getProducts() {
    console.log('getProducts method called.');
    this.productService.getProducts().subscribe( products => {
      this.rows = products;
    });
  }

  // tslint:disable-next-line:typedef
  getProductsWithFilter(name: string, description: string, detailDescription: string, page: any, sortType: string, sortField: string) {
    console.log('getProductsWithFilter method called.');
    this.productService.getProductsWithFilter(name, description, detailDescription, page, sortType, sortField).subscribe( products => {
      this.rows = products;
    });
    return this.rows;
  }

  // tslint:disable-next-line:typedef
  updateFilter(event: any) {
    this.rows = this.getProductsWithFilter(this.name, this.description, this.detailDescription, this.page, this.sortType , this.sortField);
  }

  // tslint:disable-next-line:typedef
  onSort(event: any) {
    console.log('Sort Event called for sortType: ' + event.sorts[0].dir + ' and field: ' + event.sorts[0].prop);
    const sort = event.sorts[0];
    this.sortType = sort.dir;
    this.sortField = sort.prop;
    this.rows = this.getProductsWithFilter(this.name, this.description, this.detailDescription, this.page, this.sortType , this.sortField);
  }
  // tslint:disable-next-line:typedef
  setPage(pageInfo: { offset: any; }){
    this.page = pageInfo.offset;
    this.rows = this.getProductsWithFilter(this.name, this.description, this.detailDescription, this.page, this.sortType , this.sortField);
  }

}
