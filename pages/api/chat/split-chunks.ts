import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "22mb",
    },
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Here ...");
  try {
    const { sentenceList } = req.body;

    res.status(200).json({
      chunkList: [
        {
          content_length: 774,
          content:
            'Learning Ruby can be overwhelming with all the bits & pieces you have to remember. That\'s why I put together this reference for you! It will help refresh your memory & quickly review what you need to know to write Ruby programs. Have fun! A string is a sequence of characters inside two quotation marks (   ""   ). Used to represent text & data.  Example :  "I like chocolate"  You can also use single quotation marks (   \'\'   ).  Important methods : size empty? include? gsub split  More methods :  https://www.rubyguides.com/2018/01/ruby-string-methods/ A hash (   {}   ) is a key-value pair (   a => b   ) data structure. Used as a dictionary. You can access hash elements by their keys. Keys are unique.  Example :  # Create  The Ultimate Ruby Cheatsheet  Strings Hashes',
          content_tokens: 199,
          page_num: 1,
        },
        {
          content_length: 855,
          content:
            'h = { a: 1, b: 2, c: 3 }  # Access  h[:a]  # Set  h[:test] = 10  Important methods : key? fetch new (for default values) merge  More methods :  http://ruby-doc.org/core-2.6.4/Hash.html A static string used for identification, one common example is hash keys. They always start with a colon (   :bacon   ). Symbols are never used for their content (the individual characters).  Learn more :  https://www.rubyguides.com/2018/02/ruby-symbols/ A singleton class (only one object allowed) that represents a default or "not found" kind of value. Evaluates to "false" in a conditional context.  Learn more :  https://www.rubyguides.com/2018/01/ruby-nil/  https://www.rubyguides.com/2019/02/ruby-booleans/ An object used to represent a list of objects. An array can contain any kind of object (   a =  [1, "abc", []]   ), including other arrays.  Symbol Nil Array',
          content_tokens: 261,
          page_num: 2,
        },
        {
          content_length: 714,
          content:
            "You access array elements with their index (   a[0]   ) & nested arrays with   a[0][0]   .  Important methods : size empty? push / pop join flatten  More methods :  http://ruby-doc.org/core-2.6.4/Array.html A Ruby module used to iterate over the elements of any class that implements the   each  method, like Array, Range & Hash.  Important methods : map select inject  More :  https://www.rubyguides.com/2016/03/enumerable-methods/ A class that helps you work with files in Ruby. Anything from reading them, writing to them or even getting info about them, like the file size.  Important methods : read write  More :  https://www.rubyguides.com/2015/05/working-with-files-ruby/  Enumerable File Regular Expression",
          content_tokens: 198,
          page_num: 3,
        },
        {
          content_length: 1063,
          content:
            'If you\'re looking to find patterns, substrings, or something specific inside a string, then a regular expression may be what you\'re looking for. They can be used to validate email addresses & phone numbers. Or to extract information from text.  Example :  "aaaa1".match?(/[0-9]/)  # true  "".match?(/[0-9]/)  # false  Learn more :  https://www.rubyguides.com/2015/06/ruby-regex/ Ruby gems are packages you can download to use in your Ruby programs. These packages give you new functions. For example, in Rails you can easily add authentication with the Devise gem, or pagination with the Kaminari gem.  Learn more :  https://www.rubyguides.com/2018/09/ruby-gems-gemfiles-bundler/ Ruby is an Object-Oriented Programming language. We think of everything as an object. Objects are created from their blueprints, classes. Objects can know things & do things. You tell objects to do things with methods.  Important methods : class include / extend  Learn more :  https://www.rubyguides.com/2019/02/ruby-class/  Ruby Gems & Bundler Classes & Object-Oriented Programming',
          content_tokens: 279,
          page_num: 4,
        },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
};

export default handler;
