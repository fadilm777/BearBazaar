import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"


function AppProfile({ user }) {
  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <div className="flex justify-center items-center grid-flow-col py-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <CardTitle>{user.name}</CardTitle>
        </div>
      </CardHeader >
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex w-full items-center gap-1 justify-center">
            <Mail className="size-4 me-1" />
            <p>{user.email}</p>
          </div>
          <div className="flex w-full items-center gap-1 justify-center">
            <Phone className="size-4 me-1" />
            <p>{user.id}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">

      </CardFooter>
    </Card >
  )
}
export default AppProfile
