import React from 'react'
import {create} from 'react-test-renderer' 
import ProfileStatus from './ProfileStatus' 

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const instance = component.root; //use getInstance() if testing class component.
        expect(instance.props.status).toBe("it-kamasutra.com");
    });
    test('after creation <span> should be displayed', ()=>{
        const component = create(<ProfileStatus status='staus' />)
        const root = component.root
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    })
    test('after creation <input> shouldnt be displaued', ()=>{
        const component = create(<ProfileStatus status='status is heare' />)
        const root = component.root
        expect(()=>{
            let input = root.findByType('input')
        }).toThrow()
    })
    test('input should be displayd in editMode instead of span', ()=>{
        const component = create(<ProfileStatus status='silverChariot' />)
        const root = component.root
        const span = root.findByType('span')
        span.props.onDoubleClick()
        const input = root.findByType('input')
        expect(input.props.value).toBe('silverChariot')
    })
    test('after creation <span> should contains correct status', ()=>{
        const component = create(<ProfileStatus status='status change' />)
        const root = component.root
        const span = root.findByType('span')
        expect(span.children[0]).toBe('status change')
    })
    // test('callback should be called', ()=>{
    //     const mockCallBack = jest.fn()
    //     const component = create(<ProfileStatus status={'status with call back'} upfateStatus={mockCallBack} />)
    //     const root = component.root
    //     const span = root.findByType('span')
    //     span.props.onDoubleClick()
    //     const input = root.findByType('input')
    //     input.props.onBlur()
    //     expect(mockCallBack.mock.calls.length).toBe(2)
    // })
})

