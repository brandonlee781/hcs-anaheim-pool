import { FormEvent } from 'react'

import { Button } from '@/components/Elements/Button'
import { Card } from '@/components/Elements/Card'
import { Input } from '@/components/Elements/Form/Input'
import { supabase } from '@/lib/supabase'

export const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: 'https://brandonlee781.github.io/hcs-tournament-schedule/' },
      })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateEmail = async (val: string) => setEmail(val)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-80 h-[12rem] !p-8">
        {loading ? (
          'Sending magic link...'
        ) : (
          <form onSubmit={e => handleLogin(e)} className="w-full flex flex-col">
            <Input
              label="Email"
              placeholder="Email"
              value={email}
              onChange={e => updateEmail(e.target.value)}
            />
            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}
