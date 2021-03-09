const fs = require('fs');
const PATH = "./src/modules/";
const MODULE_NAME = process.argv[2];
const MODULE_NAME_CLASS = MODULE_NAME[0].toLocaleUpperCase() + MODULE_NAME.slice(1);

async function create() {
    try {
        await fs.mkdir(PATH + MODULE_NAME, () => { });
        await fs.mkdir(PATH + MODULE_NAME + "/factory", () => { });
        await fs.mkdir(PATH + MODULE_NAME + "/useCases", () => { });
        await fs.mkdir(PATH + MODULE_NAME + "/route", () => { });
        await fs.writeFile(PATH + MODULE_NAME + "/factory/" + MODULE_NAME_CLASS + "Factory.ts", factory, () => { });
        await fs.writeFile(PATH + MODULE_NAME + "/useCases/" + MODULE_NAME_CLASS + "UseCase.ts", useCase, () => { });
        await fs.writeFile(PATH + MODULE_NAME + "/route/" + MODULE_NAME_CLASS + "Route.ts", route, () => { });
    } catch (error) {
        
    }
}

create();

const factory = `
import { DataBaseFile } from "../../../DAL/dataBaseFile";
import { IDataBase } from "../../../DAL/IDataBase";
import { I${MODULE_NAME_CLASS}Route, ${MODULE_NAME_CLASS}Route } from "../route/${MODULE_NAME_CLASS}Route";
import { I${MODULE_NAME_CLASS}UseCase, ${MODULE_NAME_CLASS}UseCase } from "../useCases/${MODULE_NAME_CLASS}UseCase";

export interface I${MODULE_NAME_CLASS}Factory {
    ${MODULE_NAME}Route: I${MODULE_NAME_CLASS}Route;
}

export class ${MODULE_NAME_CLASS}Factory implements I${MODULE_NAME_CLASS}Factory {
    private dataBase: IDataBase = new DataBaseFile();
    private ${MODULE_NAME_CLASS}DataBase: I${MODULE_NAME_CLASS}DataBase = new ${MODULE_NAME_CLASS}ataBase(this.dataBase);
    private ${MODULE_NAME}UseCase: I${MODULE_NAME_CLASS}UseCase = new ${MODULE_NAME_CLASS}UseCase();
    readonly ${MODULE_NAME}Route: I${MODULE_NAME_CLASS}Route = new ${MODULE_NAME_CLASS}Route(this.${MODULE_NAME}UseCase);
}
`

const useCase = `
export interface I${MODULE_NAME_CLASS}UseCase {
    myFunction: () => Promise<null>;
}

export class ${MODULE_NAME_CLASS}UseCase implements I${MODULE_NAME_CLASS}UseCase {
    constructor() {
    }

    myFunction = async () => {
        try {
          
        } catch (error) {
            console.warn('${MODULE_NAME_CLASS}UseCase -> myFunction: ', error);
            return null;
        }
    }

}
`
const route = `
import { I${MODULE_NAME_CLASS}UseCase } from "../useCases/${MODULE_NAME_CLASS}UseCase";

const { validationResult } = require('express-validator');
const { check } = require('express-validator')

export interface I${MODULE_NAME_CLASS}Route {
    routeName: string;
    validator: Array<any>;
    myFunction: (req: any, res: any) => Promise<void>;
}

export class ${MODULE_NAME_CLASS}Route implements I${MODULE_NAME_CLASS}Route {
    readonly routeName = '/create-room';
    readonly validator = [
        check('name', 'Wrong name').isLength({ min: 1 }),
        check('admin', 'Wrong admin id').isUUID(),
        check('members', 'Members can not be empty').isArray( ),
    ];

    constructor(private  ${MODULE_NAME}UseCase:I${MODULE_NAME_CLASS}UseCase) {

    }

    myFunction = async (req: any, res: any) => {
        try {
            const { error, message, isError } = this.validateRequest(req);
            const {  } = req.body;
            if (isError) {
                return res.status(200).json({ error, message, status: 'error' });
            }
            const room = await this.${MODULE_NAME}UseCase.myFunction();
            if (room) {
                res.status(200).send({ message: '', data: room, ok: true });
            } else {
                res.status(200).send({ status: 'error', message: 'room is not created' });
            }
        } catch (error) {
            console.warn('${MODULE_NAME_CLASS} -> ${MODULE_NAME}: ', error);
            res.status(400).send({ status: 'error', message: 'room is not created', error });
        }
    }

    validateRequest = (req): { error: Array<string>; message: string; isError: boolean; } => {
        const result = { error: [], message: '', isError: false };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            result.error = errors.array();
            result.message = 'Wrong request data';
            result.isError = true;
        }
        return result;
    }

}
`