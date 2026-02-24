import Link from 'next/link';

const projectDetails: Record<string, any> = {
  "scheduler": {
    title: "スケジューラー (Laravel)",
    fullDescription: "家計簿、カレンダー、そして運動記録を一つの画面で管理できる統合ツールです。",
    tech: ["PHP", "Laravel", "PostgreSQL", "Tailwind CSS"],
    points: ["MVCモデルに基づいた設計", "カレンダー表示ライブラリのカスタマイズ"],
    images: [
      "/images/laravel/①.png", "/images/laravel/②.png", "/images/laravel/③.png",
      "/images/laravel/④.png", "/images/laravel/⑤.png", "/images/laravel/⑥.png",
      "/images/laravel/⑦.png"
    ],
    github: "https://github.com/KHaruki1242/My-portfolio" // 必要に応じてリポジトリURLを変更してください
  },
  "sakurazaka-db": {
    title: "櫻坂46メンバーリスト (Java/AWS)",
    fullDescription: "推し活を効率化するために作成。メンバー情報や楽曲データを一括管理。",
    tech: ["Java 17", "Spring Boot", "MySQL", "AWS (EC2, S3, RDS)"],
    points: ["AWS S3を利用した画像アップロード機能", "リレーショナルDBによるデータ管理"],
    images: [
      "/images/Java/structure_sakura.png",
      "/images/Java/①.png", "/images/Java/②.png", "/images/Java/③.png",
      "/images/Java/④.png", "/images/Java/⑤.png"
    ],
    github: "https://github.com/KHaruki1242/My-portfolio"
  },
  "scraping": {
    title: "ブログスクレイピング (GAS/TS)",
    fullDescription: "推しメンのブログ更新を毎分チェック。更新があれば即座に通知を受け取れるように設計しました。",
    tech: ["TypeScript", "Google Apps Script", "clasp"],
    points: ["Cheerioを用いた効率的なパース処理", "TypeScriptによる型安全な実装"],
    images: ["/images/GAS/①.png"],
    code: `function ParserScraping() {
  const url = "https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000&ct=64";
  const response = UrlFetchApp.fetch(url);
  const content = response.getContentText();

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("シート1");

  const lastRow = sheet.getLastRow();
  const existingUrls = lastRow >= 3 ? sheet.getRange(3, 3, lastRow - 2).getValues().flat() : [];

  const topic_block = Parser.data(content).from('<ul class="com-blog-mainlist">').to('</ul>').build();
  const content_block = Parser.data(topic_block).from('<li class="sep-hr">').to('</li>').iterate();

  let newArticles = [];

  for (let i = 0; i < content_block.length; i++) {
    const articleHtml = content_block[i];
    const date = Parser.data(articleHtml).from('<p class="date wf-a">').to('</p>').build().trim();
    const titlePartHtml = Parser.data(articleHtml).from('<h3 class="title">').to('</h3>').build();
    const urlPath = Parser.data(titlePartHtml).from('<a href="').to('">').build();
    const title = titlePartHtml.replace(/<[^>]+>/g, "").trim();

    if (!urlPath || urlPath.includes("itemtype") || !urlPath.includes("/detail/")) continue;

    const fullUrl = "https://sakurazaka46.com" + urlPath;

    if (!existingUrls.includes(fullUrl)) {
      newArticles.push([date, title, fullUrl]);
    }
    if (newArticles.length >= 10) break;
  }

  if (newArticles.length > 0) {
    newArticles.reverse().forEach(article => {
      sheet.insertRowBefore(3);
      sheet.getRange(3, 1, 1, 3).setValues([article]);
    });
  }
}`,
    link: "https://docs.google.com/spreadsheets/d/1iZeEO0-iypdu7CbrT96AMebsYGqjS4yGxOB4B7hc8Gg/edit?usp=sharing",
    github: "https://github.com/KHaruki1242/GAS_scraping"
  },
  "kakeibo-vba": {
    title: "家計簿 (VBA)",
    fullDescription: "Excel上で動作する家計簿ツールです。カレンダー形式での入力と、グラフによる収支の自動可視化を実現しました。",
    tech: ["VBA", "Excel"],
    points: ["ユーザーフォームによる直感的な入力", "ピボットテーブルと連動した自動グラフ生成"],
    images: ["/images/VBA/①.png"],
    github: "https://github.com/KHaruki1242/My-portfolio"
  },
};

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projectDetails[id];

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">プロジェクト（ID: {id}）が見つかりません。</p>
        <Link href="/" className="text-blue-500 underline">トップへ戻る</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-white text-gray-900">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-blue-500 hover:text-blue-700">← 戻る</Link>
        <h1 className="text-3xl font-bold mt-6 mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t: string) => (
            <span key={t} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{t}</span>
          ))}
        </div>

        {/* 画像表示セクション */}
        {project.images && project.images.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">
              {id === 'sakurazaka-db' ? 'システム構成図/イメージ画像' : 'イメージ画像'}
            </h2>
            <div className="flex flex-col gap-6">
              {project.images.map((img: string, index: number) => (
                <div key={index} className="bg-white p-2 border rounded-lg shadow-sm">
                  <img 
                    src={img} 
                    alt={`${project.title} image ${index + 1}`} 
                    className="w-full h-auto rounded"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">概要</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{project.fullDescription}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">こだわったポイント</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {project.points.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        {/* ソースコード表示エリア */}
        {project.code && (
          <section className="mt-10 mb-10">
            <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">主要ソースコード</h2>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed font-mono">
                <code>{project.code}</code>
              </pre>
            </div>
          </section>
        )}

        {/* 外部リンクボタンエリア */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 mb-10">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-900 transition-colors shadow-lg"
            >
              <span className="mr-2">GitHubでコードを見る</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          )}

          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg"
            >
              Googleスプレッドシートを見る
            </a>
          )}
        </div>
      </div>
    </main>
  );
}