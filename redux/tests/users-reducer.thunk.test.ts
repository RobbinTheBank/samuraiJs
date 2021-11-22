import { APIResponseData, GetItems, ResultCodeEnum } from "../../api/api"
import { usersAPI } from "../../api/users-api"
import { UserType } from "../types/types"
import { actions, follow, getUsers, unfollow } from "../reucers/users-reducer"

jest.mock("../../api/api")

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: APIResponseData = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}
const getUsersResult: GetItems = {
    items: [] as Array<UserType>,
    totalCount: 0,
    error: '' as string | null
}
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(()=>{
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
    usersAPIMock.getUsers.mockClear()
})
usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
usersAPIMock.getUsers.mockReturnValue(Promise.resolve(getUsersResult))

test('Follow thank must be succes', async () => {  
    const thunk = follow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followUser(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})
test('Unfollow thank must be succes', async ()=>{
    const thunk = unfollow(2)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 2))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowUser(2))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 2))
})
test('GetUsers thunk should be correct', async ()=>{
    let filter = {
        term: '',
        friend: null 
    }
    const thunk = getUsers(2, 10, filter)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(6)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setIsFetching(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setCurrentPage(2))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.pageChanged(2))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, actions.setIsFetching(false))
    expect(dispatchMock).toHaveBeenNthCalledWith(5, actions.setUser(getUsersResult.items))
    expect(dispatchMock).toHaveBeenNthCalledWith(6, actions.setTotalUsersCount(getUsersResult.totalCount))
    
})