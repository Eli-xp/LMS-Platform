export class UpdatePositionDto{
    chapters!:{
        id: string
        positions: number
    }[];
    lessons!:{
        id: string
        position: number
    }[];
}