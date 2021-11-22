import { APIResponseData, ResultCodeEnum } from "../../api/api"
import { profileAPI } from "../../api/profile-api"



jest.mock('../api/profile-api')
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>
const result: APIResponseData = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}
test('SaveProfile', ()=>{
    profileAPIMock.saveProfile.mockReturnValue(Promise.resolve(result))
})