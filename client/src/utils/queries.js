import { gql } from '@apollo/client';

export const QUERY_PROFILE = gql`
    query allProfiles {
        profiles {
            _id
            name
        }
    }
`;

export const QUERY_SINGLE_PROFILE = gql`
    query singleProfile($profileId: ID!) {
        profile(profileId: $profileId) {
            _id
            name
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            name
        }
    }
`;

export const QUERY_POST = gql`
    query allPosts {
        posts {
            _id
            postAuthor
            postText
            imageUrl
            createdAt
            comments {
                commentText
                commentAuthor
                createdAt
                secondLevelComments {
                    secondLevelcommentText
                    secondLevelcommentAuthor
                    secondLevelcreatedAt
                }
            }
        }
    }
`;
