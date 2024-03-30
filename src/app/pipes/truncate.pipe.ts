import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTruncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const maxLength = 20;
    const ellipsis = '...';

    if (!value || value.length <= maxLength) {
      return value;
    }

    // Verificar si hay contenido entre <>
    const openBracketIndex = value.indexOf('<');
    const closeBracketIndex = value.indexOf('>');
    
    if (openBracketIndex !== -1 && closeBracketIndex !== -1 && closeBracketIndex > openBracketIndex) {
      // Si hay contenido entre <> y la longitud total del texto es menor o igual a maxLength, no se corta el texto
      const insideBracketsLength = closeBracketIndex - openBracketIndex - 1;
      const remainingLength = maxLength - insideBracketsLength;
      
      if (remainingLength >= 0 && value.length <= maxLength) {
        return value;
      }
    }

    // Truncar el texto y agregar '...'
    return value.substring(0, maxLength - ellipsis.length) + ellipsis;
  }

}
