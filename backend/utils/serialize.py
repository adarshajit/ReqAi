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

def convert_property_value_to_string(obj, prop_name):
    if isinstance(obj.get(prop_name), list):
        prop_value = "".join(obj[prop_name])
    else:
        prop_value = str(obj.get(prop_name, ''))
    
    return prop_value
