import { getUserPostsRequest } from "../../api/services";
import { Fragment, useState, useEffect } from "react";
import { FeedSection, ImgDiv, InfoDiv, LinkDiv } from "../../components/Feed/style";
import { RowSubtitlePage, SubtitlePage, Wrapper } from "./style";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
export default function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState({status: false, message: 'sucess'});
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const getUserPosts = async () => {
            try{
                const auxUserData = JSON.parse(localStorage.getItem('userData'));
                const token = JSON.parse(localStorage.getItem('authorization'));
                const config = {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
                const response = await getUserPostsRequest(parseInt(auxUserData[1]), config);
                console.log(`teste ${response}`);
                setPosts(response.data);
                setLoading({status: true, message: 'sucess'});
                setUserData(auxUserData);
            }catch(e){
                console.log(e);
                alert(e.message);
            }
        };
        getUserPosts();
    }, []);
    return (
        <Fragment>
            <Header />
            <Wrapper>
                {!loading.status && <Loading />}
                {loading.status && 
                    <Fragment>
                        <RowSubtitlePage>
                            <ImgDiv>
                                <img src={userData[2]} alt='user-avatar' />
                            </ImgDiv>
                            <SubtitlePage>{userData[0]}'s posts</SubtitlePage>
                        </RowSubtitlePage>
                        {posts.map((el, index) => (
                                <FeedSection key={index}>
                                    <ImgDiv>
                                        <img src={el.picture} alt="avatar-img" />
                                    </ImgDiv>
                                    <InfoDiv>
                                        <span>{el.name}</span>
                                        <h2>{el.commenter}</h2>
                                        <a href={el.link}>
                                            <LinkDiv>
                                            </LinkDiv>
                                        </a>
                                    </InfoDiv>
                                </FeedSection>
                            ))
                        }
                    </Fragment>
                }
            </Wrapper>
        </Fragment>
    );
}