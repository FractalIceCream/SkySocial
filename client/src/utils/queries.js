import { gql } from '@apollo/client';

// did not do flight offer yet
// did not do myTripInfo yet until we know what fields we are actually wanting

export const QUERY_SINGLE_PROFILE = gql`
query Query($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      posts {
        _id
        postAuthor
        postText
        imageUrl
        createdAt
        comments {
          _id
          commentText
          commentAuthor
          createdAt
          secondLevelComments {
            _id
            secondLevelcommentText
            secondLevelcommentAuthor
            secondLevelcreatedAt
          }
        }
      }
      wishlist {
        _id
        name
      }
      following {
        _id
      }
    }
  }
`;

export const QUERY_ME = gql`
query Query {
  me 
  {
    _id
    email
    name
    posts 
    {
      _id
      postAuthor
      postText
      imageUrl
      createdAt
      comments 
      {
        _id
        commentText
        commentAuthor
        createdAt
        secondLevelComments 
        {
          _id
          secondLevelcommentText
          secondLevelcommentAuthor
          secondLevelcreatedAt
        }
      }
    }
    wishlist 
    {
      _id
      name
      originLocationCode
      destinationLocationCode
      departureDate
      returnDate
      adults
      children
      infants
      travelClass
      includedAirlineCodes
      excludedAirlineCodes
      nonStop
      currencyCode
      maxPrice
      max
      itinerary 
      {
        departureDate
        departureCode
        arrivalDate
        arrivalCode
        price
      }
    }
    following
    {
      _id
      name
    }
  }
}`;
// query Query {
//     me {
//       _id
//       name
//       email
//       posts {
//         _id
//         postAuthor
//         postText
//         imageUrl
//         createdAt
//         comments {
//           _id
//           commentText
//           commentAuthor
//           createdAt
//           secondLevelComments {
//             _id
//             secondLevelcommentText
//             secondLevelcommentAuthor
//             secondLevelcreatedAt
//           }
//         }
//       }
//       wishlist {
//         _id
//         name
//         originLocationCode
//         destinationLocationCode
//         departureDate
//         returnDate
//         adults
//         children
//         infants
//         travelClass
//         includedAirlineCodes
//         excludedAirlineCodes
//         nonStop
//         currencyCode
//         maxPrice
//         max
//       }
//       following {
//         _id
//         name
//       }
//     }
//   }
// `;

export const QUERY_POST = gql`
query Query {
    posts {
      _id
      postAuthor
      postText
      imageUrl
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
        secondLevelComments {
          _id
          secondLevelcommentText
          secondLevelcommentAuthor
          secondLevelcreatedAt
        }
      }
    }
  }
`;

// export const QUERY_TRIP_INFO = gql``

export const QUERY_FOLLOWING = gql`
  query Query {
    following {
      _id
      email
      name
    }
  }
`;
