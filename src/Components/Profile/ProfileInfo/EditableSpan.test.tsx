import React from "react";
// import EditableSpan from "./EditableSpan";
// import {create} from "react-test-renderer";
//
//
// describe('Profile status component', () => {
//     test('status from props should be in the state', () => {
//         const component = create(<EditableSpan status={'it-kamasutra.com'}
//                                                updateStatusTC={() => {
//                                                }}/>);
//         const instance = component.getInstance();
//         //@ts-ignore
//         expect(instance?.state.status).toBe('it-kamasutra.com');
//     })
//
//     test('after creation <span> should be displayed', () => {
//         const component = create(<EditableSpan status={'it-kamasutra.com'}
//                                                updateStatusTC={() => {
//                                                }}/>);
//         //@ts-ignore
//         const root = component.root;
//         let span = root?.findByType('span')
//         expect(span).not.toBeNull();
//     })
//     test('after creation <input> should not be displayed', () => {
//         const component = create(<EditableSpan status={'it-kamasutra.com'}
//                                                updateStatusTC={() => {
//                                                }}/>);
//         const root = component.root;
//         expect(() => {
//             let input = root?.findByType('input')
//         }).toThrow();
//     })
//     test('after creation <span> should contain correct status', () => {
//         const component = create(<EditableSpan status={'it-kamasutra.com'}
//                                                updateStatusTC={() => {
//                                                }}/>);
//         const root = component.root;
//         let span = root?.findByType('span')
//         expect(span.children[0]).toBe('it-kamasutra.com');
//     })
//     test('input should be dispayed in editMode', () => {
//         const component = create(<EditableSpan status={'it-kamasutra.com'}
//                                                updateStatusTC={() => {
//                                                }}/>);
//         const root = component.root;
//         let span = root?.findByType('span')
//         span.props.onDoubleClick();
//         let input = root.findByType('input');
//         expect(input.props.value).toBe('it-kamasutra.com');
//     })
//
//     test('callback should be called', () => {
//         const mockCallback = jest.fn();
//         const component = create(<EditableSpan status={'it-kamasutra.com'} updateStatusTC={mockCallback}/>);
//         const instance = component.getInstance();
//         //@ts-ignore
//         instance?.deactivateEditMode();
//         expect(mockCallback.mock.calls.length).toBe(1);
//     })
// })