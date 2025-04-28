import { Doc, init, merge, getHeads, applyChanges, getAllChanges, Heads } from '@automerge/automerge';
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

  async getDocument(docId: string) {
    const doc = await Document.findOne({ docId });
    if (!doc) return init();

    let automergeDoc = init();
    for (const change of doc.changes) {
      automergeDoc = merge(automergeDoc, change);
    }
    return automergeDoc;
  }

  async applyChange(docId: string, newChange: Uint8Array) {
    const doc = await this.getDocument(docId);
    const currentHeads = getHeads(doc);

    if (!this.isChangeApplicable(currentHeads, newChange)) {
      throw new Error('Conflicting changes');
    }

    // Apply and store the change
    const updatedDoc = applyChanges(doc, [newChange]);
    await this.saveDocument(docId, updatedDoc);
  }

  private async saveDocument(docId: string, doc: Doc<unknown>) {
    const changes = getAllChanges(doc);
    await Document.updateOne(
      { docId },
      { $set: { changes: changes.map(c => Buffer.from(c)) } },
      { upsert: true }
    );
  }

  private isChangeApplicable(currentHeads: Heads, newChange: Uint8Array) {
    const tempDoc = applyChanges(init(), [newChange]);
    const changeHeads = getHeads(tempDoc);
    return changeHeads.some(head => currentHeads.includes(head));
  }
}

export default DocumentService