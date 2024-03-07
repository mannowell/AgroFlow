import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AuthForm() {
  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your email to login to your account</p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" />
        </div>
        <Button className="w-full" type="submit">
          Send Magic Link
        </Button>
      </form>
      <div className="space-y-2 text-center">
        <p className="text-gray-500 dark:text-gray-400">Or login with an alternative method</p>
        <Button className="w-full" variant="outline">
          Login with Google
        </Button>
      </div>
    </div>
  )
}