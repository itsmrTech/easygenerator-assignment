import { plainToInstance } from 'class-transformer';
import { LanguageListEnum } from 'src/core/enums';
import {
    IGenRespUtilInput,
    IGenRespUtilOutput,
    IGeneralResponse,
} from 'src/core/interfaces';

export const genResp = async (
    input: IGenRespUtilInput
): Promise<IGenRespUtilOutput> => {
    let { additionalData } = input;
    if (!additionalData) additionalData = {};
    //check response name in server.json and translate it, then combine it with data
    if (input.responseName && input.i18n) {
        const language = input.language || LanguageListEnum.EN;
        const response: IGeneralResponse = await input.i18n.t(
            input.responseName,
            {
                lang: language.toString(),
            }
        );

        return {
            ...response,
            statusCode: input.statusCode,
            ...additionalData,
            data: plainToInstance(input.dto, input.data,{
                excludeExtraneousValues: true
            
            }),
            _mock: input.mock,
        };
    }
    //if response name is not provided, just return data with the provided message
    else {
        return {
            statusCode: input.statusCode,
            message:
                input.message ??
                'Request processed but No Response Message is provided.',
            code: input.code ?? 'NO_RESPONSE_MESSAGE',
            ...additionalData,
            data: input.data,
        };
    }
};
