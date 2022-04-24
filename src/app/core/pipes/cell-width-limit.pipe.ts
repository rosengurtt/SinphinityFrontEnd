import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cellWidthLimit' })
export class CellWidthLimitPipe implements PipeTransform {
    transform(text: string, limit: number): string {
        if (text.length <= limit) {
            return text;
        }
        let returnText = text.substring(0, limit) + "\n"
        let remainingText = text.substring(limit, text.length)
        while (remainingText.length > 0) {
            if (remainingText.length > limit) {
                returnText = returnText + remainingText.substring(0, limit) + "\n"
                remainingText = remainingText.substring(limit, remainingText.length)
            }
            else
                return returnText + "\n" + remainingText
        }
    }
}