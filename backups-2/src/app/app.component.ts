import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TestData } from "./data/test-data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = "Sheets";
  // comment
}
