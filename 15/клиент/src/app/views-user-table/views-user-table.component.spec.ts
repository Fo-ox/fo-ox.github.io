import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewsUserTableComponent } from "./views-user-table.component";

describe("ViewsUserTableComponent", () => {
  let component: ViewsUserTableComponent;
  let fixture: ComponentFixture<ViewsUserTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsUserTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
