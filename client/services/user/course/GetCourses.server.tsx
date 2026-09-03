import { centralServerAPI } from "@/services/central/central.server-public&user"
const UserGetCourses_API = async () => {


const data = await centralServerAPI()


  return (
    <div>UserGetCourses</div>
  )
}
export default UserGetCourses_API