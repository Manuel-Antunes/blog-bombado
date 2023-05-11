import { NotificationContract } from '@ioc:Verful/Notification'
import Post from 'App/Models/Post'

export default class PostNotification implements NotificationContract {
  constructor(private subject: string, private message: string, private post: Post) {}

  public via() {
    return 'database' as const
  }

  public toDatabase() {
    return {
      subject: this.subject,
      message: this.message,
      postCreatedAt: this.post.createdAt,
    }
  }
}
