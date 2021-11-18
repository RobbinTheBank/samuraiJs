import { UserType } from "./types/types"
import usersReducer, { actions, InitialStateType } from "./users-reducer"

let state: InitialStateType; 
beforeEach(()=>{ // Tests will not change the current state
    state = {
        users: [{
            id: 0,
            name: 'Dimych 0',
            status: 'Status 0',
            photos: {
                small: null,
                large: null
            },
            followed: false
        },
        {
            id: 1,
            name: 'Dimych 1',
            status: 'Status 1',
            photos: {
                small: null,
                large: null
            },
            followed: false
        },
        {
            id: 2,
            name: 'Dimych 2',
            status: 'Status 2',
            photos: {
                small: null,
                large: null
            },
            followed: true
        },
        {
            id: 3,
            name: 'Dimych 3',
            status: 'Status 3',
            photos: {
                small: null,
                large: null
            },
            followed: true
        }],
        pageNumber: 1,
        pageSize: 20,
        totalUsersCount: 0,
        isFetching: false,
        followingInProgress: [],
        currentPage: 1
    }
})

test('User with id=1 must be followed. ', () => {
    
    const newState = usersReducer(state, actions.followUser(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()

})
test('User with id=2 must be unfollowed', ()=>{
    const newState = usersReducer(state, actions.unfollowUser(2))
    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})