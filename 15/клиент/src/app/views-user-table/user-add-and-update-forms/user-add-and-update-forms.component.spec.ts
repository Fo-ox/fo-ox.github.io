import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserAddAndUpdateFormsComponent } from "./user-add-and-update-forms.component";

describe("UserAddAndUpdateFormsComponent", () => {
  let component: UserAddAndUpdateFormsComponent;
  let fixture: ComponentFixture<UserAddAndUpdateFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddAndUpdateFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddAndUpdateFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
