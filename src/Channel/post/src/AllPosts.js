import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from './firebase';

const getStrTime = (time) => {
    let t = new Date(time);
    return (`${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`);
};

const linkify = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => 
        urlRegex.test(part) ? (
            <a key={index} href={part} target="_blank" rel="noopener noreferrer">
                {part}
            </a>
        ) : (
            part
        )
    );
};

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // 編集モードかどうか
    const [currentPost, setCurrentPost] = useState({ id: '', content: '' }); // 現在編集中の投稿（内容のみ）

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
            setPosts(
                snapshot.docs
                    .map((doc) => ({ id: doc.id, ...doc.data() }))
                    .sort((a, b) => a.created_at - b.created_at)
            );
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("削除しますか？");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, 'posts', id)); // 投稿を削除
                alert("投稿が削除されました。");
            } catch (error) {
                console.log("削除に失敗しました:", error);
            }
        }
    };

    const handleEdit = (post) => {
        setIsEditing(true); // 編集モードにする
        setCurrentPost({ id: post.id, content: post.content }); // 編集する投稿データをセット
    };

    const handleUpdate = async () => {
        try {
            await updateDoc(doc(db, 'posts', currentPost.id), {
                content: currentPost.content, // 内容のみ更新
                created_at: new Date().getTime(), // 更新日時を設定
            });
            setIsEditing(false); // 編集終了
            alert("投稿が更新されました。");
        } catch (error) {
            console.log("更新に失敗しました:", error);
        }
    };

    return (
        <div className="all-posts">
            <p>投稿一覧</p>
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <div className="title">ユーザー名：{post.username}</div>
                    <div className="content">内容：{linkify(post.content)}</div>
                    {/* 画像があれば表示 */}
                    {post.image && <img src={post.image} alt="投稿画像" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                    <div className="created_at">
                        投稿日：{getStrTime(post.created_at)}
                        <button onClick={() => handleDelete(post.id)} className="delete-button">削除</button>
                        <button onClick={() => handleEdit(post)} className="edit-button">編集</button>
                    </div>
                </div>
            ))}

            {isEditing && (
                <div className="edit-form">
                    <h3>内容の編集</h3>
                    <textarea
                        value={currentPost.content}
                        onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                        placeholder="新しい内容"
                    />
                    <button onClick={handleUpdate}>更新</button>
                    <button onClick={() => setIsEditing(false)}>キャンセル</button>
                </div>
            )}
        </div>
    );
};

export default AllPosts;
