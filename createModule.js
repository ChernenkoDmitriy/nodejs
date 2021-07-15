const fs = require('fs');
const PATH = "./src/modules/";
const MODULE_NAME = process.argv[2];
const MODULE_NAME_CLASS = MODULE_NAME[0].toLocaleUpperCase() + MODULE_NAME.slice(1);

async function create() {
    try {
        await fs.mkdir(PATH + MODULE_NAME, () => { });
        await fs.mkdir(PATH + MODULE_NAME + "/api", () => { });
        await fs.mkdir(PATH + MODULE_NAME + "/controller", () => { });
        await fs.mkdir(PATH + MODULE_NAME + "/DAL", () => { });
        await fs.mkdir(PATH + MODULE_NAME + "/factory", () => { });
        await fs.mkdir(PATH + MODULE_NAME + "/router", () => { });
        await fs.mkdir(PATH + MODULE_NAME + "/types", () => { });
        await fs.mkdir(PATH + MODULE_NAME + "/useCases", () => { });
        await fs.writeFile(PATH + MODULE_NAME + "/controller/" + MODULE_NAME_CLASS + "Controller.ts", controller, () => { });
        await fs.writeFile(PATH + MODULE_NAME + "/factory/" + MODULE_NAME_CLASS + "Factory.ts", factory, () => { });
        await fs.writeFile(PATH + MODULE_NAME + "/router/" + MODULE_NAME_CLASS + "Router.ts", router, () => { });
        await fs.writeFile(PATH + MODULE_NAME + "/useCases/" + MODULE_NAME_CLASS + "UseCase.ts", useCase, () => { });
    } catch (error) {
        
    }
}

create();

const router =`
import { Router } from 'express';
import { ${MODULE_NAME_CLASS}Factory } from '../factory/ ${MODULE_NAME_CLASS}Factory';
const { body } = require('express-validator');

const ROUTE_NAMES = {
}

const userRouter = Router();
const userController = ${MODULE_NAME_CLASS}Factory.get();

${MODULE_NAME}Router.post(
    ROUTE_NAMES. ,
    ${MODULE_NAME}Controller.registration
);

export default ${MODULE_NAME}Router;
`;

const factory = `
import { ${MODULE_NAME_CLASS}Persistance } from "../DAL/${MODULE_NAME_CLASS}Persistance";
import { ${MODULE_NAME_CLASS}Controller } from "../controller/${MODULE_NAME_CLASS}Controller";
const ${MODULE_NAME_CLASS}Model = require('../../../DAL/models/${MODULE_NAME}Module');

export class ${MODULE_NAME_CLASS}Factory {
    private static presenter: ${MODULE_NAME_CLASS}Controller;
    
    static get() {
        if (!${MODULE_NAME_CLASS}Factory.presenter) {
            ${MODULE_NAME_CLASS}Factory.presenter = new ${MODULE_NAME_CLASS}Factory().createPresenter();
        }
        return ${MODULE_NAME_CLASS}Factory.presenter;
    }

    private createPresenter = () => {
        const ${MODULE_NAME}Persistance = new ${MODULE_NAME_CLASS}Persistance(${MODULE_NAME_CLASS}Model);
        const ${MODULE_NAME}Helper = new ${MODULE_NAME_CLASS}nHelper(${MODULE_NAME}Persistance);

        const ${MODULE_NAME}UseCase = new ${MODULE_NAME_CLASS}UseCase(${MODULE_NAME}Helper, ${MODULE_NAME}Persistance);

        return ${MODULE_NAME}Controller;
    }
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
const controller = `
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