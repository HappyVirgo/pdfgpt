import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json([
    {
      content:
        'Learning Ruby can be overwhelming with all the bits & pieces you have to remember. That\'s why I put together this reference for you! It will help refresh your memory & quickly review what you need to know to write Ruby programs. Have fun! A string is a sequence of characters inside two quotation marks (   ""   ). Used to represent text & data.  Example :  "I like chocolate"  You can also use single quotation marks (   \'\'   ).  Important methods : size empty? include? gsub split  More methods :  https://www.rubyguides.com/2018/01/ruby-string-methods/ A hash (   {}   ) is a key-value pair (   a => b   ) data structure. Used as a dictionary. You can access hash elements by their keys. Keys are unique.  Example :  # Create  The Ultimate Ruby Cheatsheet  Strings Hashes',
      content_length: 774,
      content_tokens: 199,
      id: 208791,
      page_num: 1,
      similarity: 0.745930866568478,
    },
    {
      content:
        'If you\'re looking to find patterns, substrings, or something specific inside a string, then a regular expression may be what you\'re looking for. They can be used to validate email addresses & phone numbers. Or to extract information from text.  Example :  "aaaa1".match?(/[0-9]/)  # true  "".match?(/[0-9]/)  # false  Learn more :  https://www.rubyguides.com/2015/06/ruby-regex/ Ruby gems are packages you can download to use in your Ruby programs. These packages give you new functions. For example, in Rails you can easily add authentication with the Devise gem, or pagination with the Kaminari gem.  Learn more :  https://www.rubyguides.com/2018/09/ruby-gems-gemfiles-bundler/ Ruby is an Object-Oriented Programming language. We think of everything as an object. Objects are created from their blueprints, classes. Objects can know things & do things. You tell objects to do things with methods.  Important methods : class include / extend  Learn more :  https://www.rubyguides.com/2019/02/ruby-class/  Ruby Gems & Bundler Classes & Object-Oriented Programming',
      content_length: 1063,
      content_tokens: 279,
      id: 208795,
      page_num: 4,
      similarity: 0.733453227858508,
    },
    {
      content:
        'Learning Ruby can be overwhelming with all the bits & pieces you have to remember. That\'s why I put together this reference for you! It will help refresh your memory & quickly review what you need to know to write Ruby programs. Have fun! A string is a sequence of characters inside two quotation marks (   ""   ). Used to represent text & data.  Example :  "I like chocolate"  You can also use single quotation marks (   \'\'   ).  Important methods : size empty? include? gsub split  More methods :  https://www.rubyguides.com/2018/01/ruby-string-methods/ A hash (   {}   ) is a key-value pair (   a => b   ) data structure. Used as a dictionary. You can access hash elements by their keys. Keys are unique.  Example :  # Create  The Ultimate Ruby Cheatsheet  Strings Hashes',
      content_length: 1256,
      content_tokens: 369,
      id: 208792,
      page_num: 5,
      similarity: 0.730402472318723,
    },
    {
      content:
        'def apple(a,b,c)  # method body  end  More about methods :  https://www.rubyguides.com/2018/06/rubys-method-arguments/  https://www.rubyguides.com/2019/06/ruby-method-definition/  class Fruit  # methods  end  More about classes :  https://www.rubyguides.com/2019/02/ruby-class/  https://www.rubyguides.com/2019/01/what-is-inheritance-in-ruby/  true ? "yes" : "no"  fruit = "orange" puts "I have an #{fruit}. Would you like a slice of it?"  More about interpolation :  https://www.rubyguides.com/2019/07/ruby-string-concatenation/  [1,2,3].each do |n| puts n end  Syntax Examples  Method definition Class definition Ternary operator String interpolation Each with block',
      content_length: 668,
      content_tokens: 221,
      id: 208796,
      page_num: 6,
      similarity: 0.723682137018308,
    },
    {
      content:
        "You access array elements with their index (   a[0]   ) & nested arrays with   a[0][0]   .  Important methods : size empty? push / pop join flatten  More methods :  http://ruby-doc.org/core-2.6.4/Array.html A Ruby module used to iterate over the elements of any class that implements the   each  method, like Array, Range & Hash.  Important methods : map select inject  More :  https://www.rubyguides.com/2016/03/enumerable-methods/ A class that helps you work with files in Ruby. Anything from reading them, writing to them or even getting info about them, like the file size.  Important methods : read write  More :  https://www.rubyguides.com/2015/05/working-with-files-ruby/  Enumerable File Regular Expression",
      content_length: 714,
      content_tokens: 198,
      id: 208793,
      page_num: 3,
      similarity: 0.718797556656999,
    },
  ]);
};

export default handler;
