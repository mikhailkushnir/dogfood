import { Route, Routes } from "react-router"


export const RouterAuth = () => {

    return (<Routes>
        <Route path="/" element={<div>NOT notauth 404</div>} />
    </Routes>)
}