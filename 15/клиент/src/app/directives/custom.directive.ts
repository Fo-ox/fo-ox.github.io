import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";
import { ControlService } from "../service/control.service";

@Directive({
  selector: "[appComment]"
})
export class CustomDirective implements OnInit {
  position: boolean = false;
  comment: HTMLElement;

  constructor(private elements: ElementRef, private render: Renderer2, private service: ControlService) { }
  ngOnInit(): void {
    this.render.setStyle(this.elements.nativeElement, "font-style", "italic");
    this.render.setStyle(this.elements.nativeElement, "cursor", "pointer");

    this.comment = this.render.createElement("div");
    this.render.setStyle(this.comment, "width", `${this.elements.nativeElement.clientWidth -  56}px`);
    this.render.setStyle(this.comment, "background", "#ebf7fc");
    this.render.setStyle(this.comment, "border", "1px dashed #ccc");
    this.render.setStyle(this.comment, "font-size", "10px");
    this.render.setStyle(this.comment, "color", "black");
    this.render.setStyle(this.comment, "padding", "8px");
    this.render.setStyle(this.comment, "background", "#ebf7fc");
    this.render.setStyle(this.comment, "position", "relative");
    this.render.setStyle(this.comment, "margin", "6px auto");
    this.render.setStyle(this.comment, "display", "none");

    this.render.appendChild(this.elements.nativeElement, this.comment);
    this.render.setAttribute(this.comment, "contenteditable", "true");
  }

  @HostListener("dblclick") onEnter(): void {
    this.position = !this.position;
    if (this.position) {
      this.render.setStyle(this.comment, "display", "block");
      this.render.setStyle( this.elements.nativeElement, "background-color", "#ebf7fc");
    } else {
      this.render.setStyle(this.comment, "display", "none");
      this.render.setStyle( this.elements.nativeElement, "background-color", null);
    }
  }
  @HostListener("keyup") onChange(): void {
    if ( this.comment.innerHTML !== "") {
      this.render.setStyle( this.elements.nativeElement, "color", "#5f5fff");
    }
    if ( this.comment.innerHTML === "" || this.comment.innerHTML === "<br>") {
      this.render.setStyle( this.elements.nativeElement, "color", null);
    }
  }
}
