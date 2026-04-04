import Link from 'next/link';

const projectDetails: Record<string, any> = {
  // スケジューラー (Laravel)
  "scheduler": {
    title: "スケジューラー",
    fullDescription: "家計簿、カレンダー、そして運動記録を一つの画面で管理できる統合ツールです。PHP/Laravelを用いたフルスクラッチ開発で、実用性を重視しました。",
    tech: ["PHP", "Laravel", "PostgreSQL", "Tailwind CSS"],
    points: ["MVCモデルに基づいた設計", "カレンダー表示ライブラリのカスタマイズ"],
    images: [
      "/images/laravel/①.png", "/images/laravel/②.png", "/images/laravel/③.png",
      "/images/laravel/④.png", "/images/laravel/⑤.png", "/images/laravel/⑥.png",
      "/images/laravel/⑦.png"
    ],
    github: "https://github.com/KHaruki1242/hello-laravel",
    code: `// ScheduleService.php - ビジネスロジックの分離
namespace App\\Services;

use App\\Models\\Schedule;
use Illuminate\\Support\\Facades\\DB;

class ScheduleService {
    public function getMonthlyData($userId, $month) {
        return DB::transaction(function () use ($userId, $month) {
            $schedules = Schedule::where('user_id', $userId)
                ->whereMonth('event_date', $month)
                ->with('category')
                ->get();

            $totalExpense = $schedules->sum('expense_amount');
            
            return [
                'items' => $schedules,
                'summary' => ['total' => $totalExpense]
            ];
        });
    }
}`
  },

  // メンバーリスト (Java/AWS/SQL)
  "sakurazaka-db": {
    title: "櫻坂46メンバーリスト",
    fullDescription: "櫻坂46のファン活動を効率化するために開発。AWS S3とRDS(MySQL)を連携させた「クラウド運用版」と、SQL Serverを用いた「ローカル開発版」の2つの構成を設計しました。",
    tech: ["Java", "Spring Boot", "MySQL / SQL Server", "AWS (EC2, S3, RDS)"],
    points: [
      "AWS S3連携: 画像メタデータとS3オブジェクトの動的マッピング",
      "複雑なSQL集計: STRING_AGGやJOINを用いたフォーメーション・選抜回数の自動集計",
      "マルチDB対応: プロファイル切り替えによる柔軟な環境構築"
    ],
    images: [
      "/images/Java/structure_sakura.png", 
      "/images/Java/DB①.png", "/images/Java/DB②.png", "/images/Java/DB③.png",
      "/images/Java/DB④.png", "/images/Java/DB⑤.png", "/images/Java/DB⑥.png", "/images/Java/DB⑦.png",
      "/images/Java/①.png", "/images/Java/②.png", "/images/Java/③.png",
      "/images/Java/④.png", "/images/Java/⑤.png"
    ],
    github: "https://github.com/KHaruki1242/SakuraService-",
    github_local: "https://github.com/KHaruki1242/SakuraService2",
    code: `// SongService.java - STRING_AGGを用いた高度な集計SQL
@Service
public class SongService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getAllSongsWithMembers() {
        String sql = "SELECT s.id, s.title, s.release_date, s.single_number, " +
                     "STRING_AGG(m.member_name, ', ') WITHIN GROUP (ORDER BY m.member_name) as member_list " +
                     "FROM song_list s " +
                     "LEFT JOIN song_members sm ON s.id = sm.song_id " +
                     "LEFT JOIN members m ON sm.member_id = m.id " +
                     "GROUP BY s.id, s.title, s.release_date, s.single_number";
        return jdbcTemplate.queryForList(sql);
    }
}`
  },

  // スクレイピング (GAS)
  "scraping": {
    title: "ブログスクレイピング",
    fullDescription: "推しメンのブログ更新を毎分チェック。更新があれば即座にスプレッドシートへ記録し、通知を受け取れるように設計しました。",
    tech: ["TypeScript", "Google Apps Script"],
    points: ["Cheerioを用いた効率的なパース処理", "TypeScriptによる型安全な実装", "トリガーによる定期実行の自動化"],
    images: ["/images/GAS/①.png"],
    link: "https://docs.google.com/spreadsheets/d/1iZeEO0-iypdu7CbrT96AMebsYGqjS4yGxOB4B7hc8Gg/edit?usp=sharing",
    github: "https://github.com/KHaruki1242/GAS_scraping",
    code: `function updateBlogDatabase(): void {
  const targetUrl = "https://sakurazaka46.com/s/s46/diary/blog/list";
  const response = UrlFetchApp.fetch(targetUrl);
  const $ = Cheerio.load(response.getContentText());
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
  const existingUrls = sheet.getRange("A:A").getValues().flat();
  const newArticles: string[][] = [];

  $(".com-blog-mainlist .sep-hr").each((i, el) => {
    const url = "https://sakurazaka46.com" + $(el).find("a").attr("href");
    if (!existingUrls.includes(url)) {
      newArticles.push([url, $(el).find(".title").text().trim(), new Date().toLocaleString()]);
    }
  });

  if (newArticles.length > 0) {
    sheet.insertRowsAfter(1, newArticles.length);
    sheet.getRange(2, 1, newArticles.length, 3).setValues(newArticles);
  }
}`
  },

  // 家計簿 (VBA)
  "kakeibo-vba": {
    title: "家計簿",
    fullDescription: "Excel上で動作する家計簿ツールです。ユーザーフォームによる入力と、シートの自動複製機能を備えています。",
    tech: ["VBA", "Excel"],
    points: ["自作集計ロジックによる詳細な収支分析", "シートのバックアップとクリアの自動化"],
    images: ["/images/VBA/①.png"],
    github: "https://github.com/KHaruki1242/VBA_kakeibo",
    code: `' --- カテゴリ別の高速集計ロジック ---
Sub Jisaku_SUM()
    Dim i As Long, EndRow As Long
    Dim totalKotei As Double, totalHendou As Double
    EndRow = Cells(Rows.Count, 1).End(xlUp).Row
    totalKotei = 0: totalHendou = 0
    For i = 4 To EndRow
        Select Case Cells(i, 2).Value
            Case "固定費": totalKotei = totalKotei + Cells(i, 5).Value
            Case "変動費": totalHendou = totalHendou + Cells(i, 5).Value
        End Select
    Next i
    Range("G8").Value = totalKotei
    Range("G9").Value = totalHendou
End Sub`
  }, // ← ここにカンマを追加しました

  // 3月に作成：トレンド・ウェザー解析システム
  "trend-news": {
    title: "地域特化型トレンド＆気象解析システム",
    fullDescription: "特定の地域（仙台）のニュースと天気情報を自動収集し、一元管理するハイブリッドシステムです。GASで外部APIから取得したデータを整形し、ngrokを用いてローカルのJavaサーバーへ送信。データの蓄積と解析を行う仕組みを構築しました。",
    tech: ["Java 21", "Spring Boot", "Google Apps Script (GAS)", "ngrok", "SQL Server"],
    points: [
      "マルチソース・データ収集: RSSパースによるニュース取得と気象庁JSONデータの解析",
      "ngrokを活用したセキュア通信: ローカル開発環境を外部公開し、GASからのWebhookを受け取り",
      "高度なデータクレンジング: 正規表現を用いたHTMLタグ除去や特殊文字のデコード",
      "アーカイブ・運用設計: 送信完了後のデータを自動アーカイブし、二重送信を防止"
    ],
    images: ["/images/News/image1.png"], // ← スラッシュに修正しました
    github: "https://github.com/KHaruki1242/TrendAndNews",
    code: `// TrendCollector.gs - GASからJavaサーバー(ngrok経由)へデータを送信
function sendSendaiWeather(baseUrl) {
  const url = "https://www.jma.go.jp/bosai/forecast/data/forecast/040000.json";
  const response = UrlFetchApp.fetch(url);
  const data = JSON.parse(response.getContentText());

  const dates = data[1].timeSeries[0].timeDefines;
  dates.forEach((date, i) => {
    const weatherData = {
      prefecture: "宮城県",
      city: "仙台市",
      date: Utilities.formatDate(new Date(date), "JST", "yyyy-MM-dd"),
      weatherCode: data[1].timeSeries[0].areas[0].weatherCodes[i],
      maxTemp: String(data[1].timeSeries[1].areas[0].tempsMax[i] || "--")
    };

    UrlFetchApp.fetch(baseUrl + "/api/weather", {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(weatherData),
      headers: { "ngrok-skip-browser-warning": "true" }
    });
  });
}`
  }
}; // ← 最後に全ての変数を閉じました

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projectDetails[id];
  if (!project) return <div className="p-8 text-center"><Link href="/">戻る</Link></div>;

  const structureImg = project.images.find((img: string) => img.includes("structure"));
  const dbImages = project.images.filter((img: string) => img.includes("DB"));
  const uiImages = project.images.filter((img: string) => !img.includes("DB") && !img.includes("structure"));

  return (
    <main className="min-h-screen p-8 bg-white text-gray-900">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-blue-500 hover:text-blue-700">← 戻る</Link>
        <h1 className="text-3xl font-bold mt-6 mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t: string) => (
            <span key={t} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{t}</span>
          ))}
        </div>

        <section className="mb-10">
          {id === 'sakurazaka-db' ? (
            <>
              {structureImg && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 border-l-4 border-blue-500 pl-3">システム構成図</h2>
                  <div className="bg-white p-2 border rounded-xl shadow-sm"><img src={structureImg} className="w-full h-auto rounded-lg" /></div>
                </div>
              )}
              {dbImages.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 border-l-4 border-gray-800 pl-3">DB設計</h2>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                    {dbImages.map((img: string, i: number) => (
                      <div key={i} className="flex-shrink-0 w-80 bg-gray-50 p-2 border rounded-lg shadow-sm">
                        <img src={img} className="w-full h-auto rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {uiImages.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 border-l-4 border-green-500 pl-3">UI / アプリ画面</h2>
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {uiImages.map((img: string, i: number) => (
                      <div key={i} className="flex-shrink-0 w-72 bg-white p-2 border rounded-lg shadow-sm">
                        <img src={img} className="w-full h-auto rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-3 border-l-4 border-blue-500 pl-3">イメージギャラリー</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                {project.images.map((img: string, i: number) => (
                  <div key={i} className="flex-shrink-0 w-80 bg-white p-2 border rounded-lg shadow-sm">
                    <img src={img} className="w-full h-auto rounded" />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="mb-10 text-gray-700">
          <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">概要</h2>
          <p className="leading-relaxed whitespace-pre-wrap">{project.fullDescription}</p>
        </section>

        {project.code && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">主要ソースコード</h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed">
              <code>{project.code}</code>
            </pre>
          </section>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 mb-10">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold hover:bg-black transition-all text-center shadow-lg">
            GitHubでコードを見る
          </a>
          {project.github_local && (
            <a href={project.github_local} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-all text-center shadow-lg">
              GitHub (Java&SQL版)
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-all text-center shadow-lg">
              Googleスプレッドシートを見る
            </a>
          )}
        </div>
      </div>
    </main>
  );
}