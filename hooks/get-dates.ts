import moment from "moment";

export const getDates = () => {
    const today = moment().format("YYYY-DD-MM")
    const todayFormatted = moment().format("YYYY-MM-DD")
    const dateString = moment().format("DD MMMM, YYYY")

    return {
        today,
        todayFormatted,
        dateString
    }
}