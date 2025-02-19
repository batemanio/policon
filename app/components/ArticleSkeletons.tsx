import styles from "./Articles.module.scss";
import skeletonStyles from "./ArticleSkeletons.module.scss";

export function ArticlesSkeletons() {
    return (
        <>
            <h1 className={styles.articlesHeader}>Articles:</h1>

            {[...Array(9)].map((_, i) => (
                <div key={i}>
                    <div className={styles.articleContainer}>
                        <div className={styles.article}>
                            <div className={styles.imageContainer}>
                                <div
                                    className={
                                        (styles.image, skeletonStyles.image)
                                    }
                                ></div>
                            </div>
                            <div>
                                <div className={styles.title}>
                                    <div
                                        className={skeletonStyles.title}
                                        style={{ fontSize: "40px" }}
                                    />
                                    <br />
                                    <div
                                        className={skeletonStyles.subTitle}
                                        style={{
                                            fontSize: "20px",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles.information}>
                                <div className={skeletonStyles.information} />
                                <div className={skeletonStyles.information} />
                                <div className={skeletonStyles.information} />
                                <div className={skeletonStyles.information} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
