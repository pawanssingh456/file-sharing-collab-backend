import Document from "../models/Document";
import Version from "../models/Version";

class DocumentService {
  async createDocument(data: any, ownerId: string) {
    const doc = new Document({ ...data, owner: ownerId });
    return await doc.save();
  }

  async saveDocumentVersion(documentId: string) {
    const doc = await Document.findById(documentId);
    if (!doc) throw new Error("Document not found");

    const version = new Version({
      content: doc.content,
      document: doc._id,
      createdBy: doc.owner,
    });
    return await version.save();
  }
}

export default DocumentService