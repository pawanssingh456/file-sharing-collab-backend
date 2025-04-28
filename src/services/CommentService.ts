import Comment from "../models/Comment";

class CommentService {
  async addComment(text: string, documentId: string, userId: string) {
    const comment = new Comment({
      text,
      document: documentId,
      user: userId,
    });
    return await comment.save();
  }
}

export default CommentService