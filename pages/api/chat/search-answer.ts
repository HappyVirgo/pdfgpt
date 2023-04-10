export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  return new Response(
    "Ruby is a programming language that uses regular expressions to find patterns, substrings, or specific information inside a string. Regular expressions can be used to validate email addresses and phone numbers or extract information from text. Ruby gems are packages that can be downloaded to use in Ruby programs, and they provide new functions. Ruby is an object-oriented programming language where everything is an object created from their blueprints, classes. Objects can know things and do things, and you tell objects to do things with methods. There are different types of variables in Ruby, including local variables, instance variables, constants, and global variables. Parentheses and semicolons are not required in Ruby, but they can be used to improve readability or change the order of operations. A string is a sequence of characters inside two quotation marks used to represent text and data. A hash is a key-value pair data structure used as a dictionary. A method is a set of instructions that can be called to perform a specific task, and a class is a blueprint for creating objects. Symbols are static strings used for identification, and they always start with a colon. An array is an object used to represent a list of objects, and it can contain any kind of object, including other arrays."
  );
};

export default handler;
