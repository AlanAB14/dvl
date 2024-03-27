import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-html-editor',
  standalone: true,
  imports: [
    CommonModule,
    AngularEditorModule,
    FormsModule
  ],
  template: `
    <angular-editor [(ngModel)]="text" (ngModelChange)="cambiaHtml()" [config]="editorConfig"></angular-editor>
  
  `,
  styleUrl: './html-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtmlEditorComponent {
  @Output() sendData = new EventEmitter<string>();
  @Input() text = '';

  editorConfig: AngularEditorConfig = {
    editable: true,
    minWidth: '30rem',
    minHeight: '10rem',
    placeholder: 'Ingrese política...',
    outline: false,
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'italic',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  }



  cambiaHtml() {
    this.sendData.emit(this.text)
  }
}
