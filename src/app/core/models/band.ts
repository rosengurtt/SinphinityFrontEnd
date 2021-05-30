import { MusicStyle } from './music-style';

export class Band {
    name: string
    id: string
    style: MusicStyle

    constructor(name: string, id: string, style?: MusicStyle) {
        this.name = name
        this.id = id
        this.style = style
    }
}