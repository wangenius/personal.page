"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Send, User, Mail, MessageSquare } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // 这里添加您的表单提交逻辑
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(formData)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('提交失败:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">联系我们</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            有任何问题或建议？请随时与我们联系。我们将尽快回复您的消息。
          </p>
        </div>

        <Card className="max-w-xl mx-auto p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  name="name"
                  placeholder="您的姓名"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  name="email"
                  type="email"
                  placeholder="您的邮箱"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Textarea
                  name="message"
                  placeholder="请输入您的留言"
                  value={formData.message}
                  onChange={handleChange}
                  className="pl-10 min-h-[120px]"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "发送中..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  发送消息
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default Contact