import { Form, Formik, Field } from "formik"
import { useSelector } from "react-redux";
import { FilterForm } from "../../../redux/reucers/users-reducer";
import { getFilterForm } from "../../../redux/selectors/users-selectors";

const UsersSearchForm: React.FC<PropsType> = (props) => {
    const usersFormValidate = (value: any) => {
        const errors = {};
        return errors;
    }
    const filter = useSelector(getFilterForm)
    const onSubmit = (values: ValuesForm, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        //alert(JSON.stringify(values))
        const filter: FilterForm = {
            term: values.term,
            friend: values.friend
        }
        setSubmitting(false);
        props.onTermChanged(filter)

    }
    return <>
        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: filter.friend as null }}
            validate={usersFormValidate}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">all users</option>
                        <option value="true">followed users</option>
                        <option value="false">unfollowed users</option>
                        
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </>
}
export default UsersSearchForm

type ValuesForm = {
    term: string,
    friend: null
}
type PropsType = {
    onTermChanged: (filter: FilterForm) => void
}