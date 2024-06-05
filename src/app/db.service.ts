import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from './types';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private url: string = "http://127.0.0.1:3000/bakery/";
  public items: Item[];
  public categories: string[];
  public error: string;
  public onItemsLoaded: Subject<boolean> = new Subject<boolean>;
  public onItemsChanged: Subject<boolean> = new Subject<boolean>;
  public onItemAdded: Subject<boolean> = new Subject<boolean>;

  constructor(private http: HttpClient) {
    this.fetchItems();
  }

  getCategories(): void {
    this.items.forEach((item) => {
      if (this.items.includes(item) === false) {
        this.items.push(item);
      }
    })
  }

  async fetchItems(): Promise<Item[]> {
    await new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe((response) => {
        this.items = response as Item[];
        this.onItemsLoaded.next(true);
        resolve(null);
      });
    });
    this.getCategories();
    return this.items;
  }

  async addItem(item: Item): Promise<void> {
    await new Promise((resolve, reject) => {
      this.http.post(this.url, item).subscribe((response) => {
        this.items.push(response as Item);
        this.onItemAdded.next(true);
        resolve(null);
      });
    });
  }

  async removeItem(id: string): Promise<void> {
    await new Promise((resolve, reject) => {
      this.http.delete(this.url + id).subscribe((response) => {
        let newItems: Item[] = [];
        this.items.forEach((item) => {
          if (item.id !== id) {
            newItems.push(item);
          }
        });
        this.items = newItems;
        this.onItemsChanged.next(true);
        resolve(null);
      });
    });
  }
}
