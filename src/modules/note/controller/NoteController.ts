const { validationResult } = require('express-validator');

export class NoteController {
    constructor(

        ) { }

    // getUserRooms = async (req: any, res: any) => {
    //     try {
    //         const errors = validationResult(req);
    //         if (!errors.isEmpty()) {
    //             return res.status(400).json({ error: errors.array(), messageKey: 'not_valid', status: 'error' });
    //         }
    //         const data = await this.getUserRoomsUseCase.getUserRooms(req.body);
    //         if (data && data.status === 'ok') {
    //             res.status(200).send(data);
    //         } else {
    //             res.status(400).send(data);
    //         }
    //     } catch (error) {
    //         res.status(500).send({ messageKey: 'Server error', error, status: 'error' });
    //     }
    // }

}