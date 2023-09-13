def serialize_comment(comment):
    return {
        "author": comment.author.displayName,
        "created": comment.created,
        "body": comment.body
    }

def serialize_attachment(attachment):
    return {
        "filename": attachment.filename,
        "url": attachment.content,
    }
