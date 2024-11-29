import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import firestore from '../../../firebase';

const NewPost = () => {
    const [username, setUsername] = useState(""); // ユーザー名
    const [content, setContent] = useState("");   // 内容
    const [file, setFile] = useState(null);       // 画像ファイル

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!username || !content) {
            alert("ユーザー名と内容の両方を入力してください。");
            return;
        }

        try {
            const postData = {
                username: username,
                content: content,
                created_at: new Date().getTime(),
            };

            if (file) {
                postData.image = URL.createObjectURL(file); // 画像URLを保存
            }

            await addDoc(collection(firestore, "posts"), postData);
            setUsername('');
            setContent('');
            setFile(null);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
        } else {
            alert("画像ファイルのみ選択してください。");
            setFile(null);
        }
    };

    return (
        <div className="new-post-container"> {/* ここで新しいクラスを追加 */}
            <p>新規投稿</p>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={username}
                    placeholder="ユーザー名"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    value={content}
                    placeholder="内容"
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {file && <img src={URL.createObjectURL(file)} alt="プレビュー" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                <button type="submit" className="post-button">投稿</button>
            </form>
        </div>
    );
};

export default NewPost;
