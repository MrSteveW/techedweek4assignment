I really enjoyed our first assignment creating a full-stack app. It is so enjoyable creating an app that will persist data!! :blush:

## :dart: Requirements achieved

- [x] HTML form takes user data and submits to PostgreSQL database as expected :star2:
- [x] Design is responsive and media query changes mobile view of form to rows :iphone:
- [x] Server has a GET, POST, PATCH and DELETE routes :wrench:
- [x] Database created with SQL. I thought carefully what data my post schema would hold and what data types they should be. I have created an id primary key, which I later use to patch and delete posts by using the id as a route parameter :floppy_disk:
- [x] It proved very interesting write a nested loop in displayPosts() to loop through each key value pair within each object. My initial idea was that it would make for fewer lines of code - just loop through creating a div, add the key as a css class and write the value in the textContent... But then I had to write an exception for the date styling, and an exception for linking the avatar code to a background image, and an exception for a likes button... not very efficient after all! :dizzy_face:

## :dart: Stretch goals

- [x] I used form vailidation - each field is 'required' and I came across a Github project which used a max number of characters and a var 'character counter', which looks neat, so I borrowed that idea :mag:
- [x] I started experimenting using **Tailwind**. I used the documentation for a Form Grid, but ended up modifying it heavily. I can see it will take a lot of practise to get to know Tailwind's shortcuts such as px- and m- for styling, but that in time it will be a shortcut for quick, effective styling! :bar_chart:
- [x] I used **Tailwind Heroicons** for the heart and trash icons - the code was soo long I had to put them in separate functions! :v:
- [x] I added a delete button listener to each post which sends a DELETE method to the server, passing the id as a parameter :scissors:
- [x] Adding likes with a PATCH was the easy part. I had a little trouble as it then wouldn't refresh the page to show the update number of likes... _another problem solved by React..._ :hearts:
- [x] I really didn't like the way the displayPosts was putting the most recently **edited** post up top. Posts were in a jumbled order :rage: First, I used a little _LLM support_, it gave me some JS to reorder the posts after they've been sent. This would obv take up loads of local processing power when the posts are in the 1000s! :worried: Then TADA. I found the SQL command to return the posts in descending order of id - server-side rending :muscle: **"SELECT \* FROM posts ORDER BY id DESC"**
- [x] I added a random number generator to the handleSubmitPost function, which links to one of 10 random avatars stored in the assets folder. This just gives it more the 'look' of a proper forum with users accounts :woman:
- [x] A quick check with _Windows Narrator_ told me the forms read out ok, but the heart and trash icons just say "graphic" - I set an attribute "aria-label" and the graphic to "aria-hidden" :sound:

With thanks to the following:
https://v1.tailwindcss.com/components/forms  
https://heroicons.com  
https://userpics.craftwork.design/  
The Eagles :metal:
