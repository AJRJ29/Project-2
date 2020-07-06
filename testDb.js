var db = require('./models');

db.comment.create({
    name:'J',
    content: "I like anime",
    animeId: 3
})
.then(function() {
})

// <!-- <% anime.comments.forEach(function(comment) { %>
//     <div class="well">
//       <p>
//         "<%= comment.content %>" - <%= comment.name %>
//       </p>
//     </div>
// <% }) %> -->