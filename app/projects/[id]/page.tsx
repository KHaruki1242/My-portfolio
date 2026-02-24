import Link from 'next/link';

const projectDetails: Record<string, any> = {
  // スケジューラー (Laravel)
  "scheduler": {
    title: "スケジューラー (Laravel)",
    fullDescription: "家計簿、カレンダー、そして運動記録を一つの画面で管理できる統合ツールです。PHP/Laravelを用いたフルスクラッチ開発で、実用性を重視しました。",
    tech: ["PHP", "Laravel", "PostgreSQL", "Tailwind CSS"],
    points: ["MVCモデルに基づいた設計", "カレンダー表示ライブラリのカスタマイズ"],
    images: [
      "/images/laravel/①.png", "/images/laravel/②.png", "/images/laravel/③.png",
      "/images/laravel/④.png", "/images/laravel/⑤.png", "/images/laravel/⑥.png",
      "/images/laravel/⑦.png"
    ],
    github: "https://github.com/KHaruki1242/hello-laravel"
  },

  // メンバーリスト (Java/AWS)
  "sakurazaka-db": {
    title: "櫻坂46メンバーリスト (Java/AWS)",
    fullDescription: "推し活を効率化するために作成。メンバー情報や楽曲データを一括管理。AWS S3とRDS(MySQL)を連携させています。",
    tech: ["Java 17", "Spring Boot", "MySQL", "AWS (EC2, S3, RDS)"],
    points: [
      "AWS S3から画像を取得し、DBのメタデータと動的にマッピング",
      "JdbcTemplateを用いた安全なSQL実行（インジェクション対策）",
      "SQLのJOINとGROUP BYを用いた選抜回数の自動集計"
    ],
    images: [
      "/images/Java/structure_sakura.png", 
      "/images/Java/DB①.png", "/images/Java/DB②.png", "/images/Java/DB③.png",
      "/images/Java/DB④.png", "/images/Java/DB⑤.png", "/images/Java/DB⑥.png", "/images/Java/DB⑦.png",
      "/images/Java/①.png", "/images/Java/②.png", "/images/Java/③.png",
      "/images/Java/④.png", "/images/Java/⑤.png"
    ],
    github: "https://github.com/KHaruki1242/My-portfolio",
    code: `// MemberService.java - S3とDBを連携させたデータ取得ロジック
@Service
public class MemberService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Member> getAllMembers(String search, int gen) {
        List<Member> memberList = new ArrayList<>();
        String bucketName = "bk--data100";
        Map<String, String> s3PathMap = new HashMap<>();
        
        try (S3Client s3 = S3Client.builder().region(Region.AP_NORTHEAST_1).build()) {
            ListObjectsV2Request listRequest = ListObjectsV2Request.builder()
                    .bucket(bucketName).prefix("sakura/members/").build();
            s3.listObjectsV2(listRequest).contents().forEach(obj -> {
                String fullPath = obj.key();
                if (fullPath.endsWith(".png")) {
                    String fileName = fullPath.substring(fullPath.lastIndexOf("/") + 1)
                                              .replace(".png", "").toLowerCase();
                    s3PathMap.put(fileName, fullPath);
                }
            });

            String sql = "SELECT m.*, COUNT(sm.song_id) as selection_count FROM members m " +
                         "LEFT JOIN song_members sm ON m.id = sm.member_id GROUP BY m.id ORDER BY m.generation ASC";

            jdbcTemplate.query(sql, (rs) -> {
                String key = rs.getString("file_key");
                if (s3PathMap.containsKey(key.toLowerCase())) {
                    String imageUrl = "https://" + bucketName + ".s3.amazonaws.com/" + s3PathMap.get(key.toLowerCase());
                    memberList.add(new Member(rs.getString("member_name"), key, imageUrl, rs.getInt("generation"), 
                        rs.getString("birthday"), rs.getString("birthplace"), rs.getString("blood_type"),
                        rs.getString("description"), rs.getDouble("height"), rs.getString("zodiac_sign"),
                        rs.getInt("selection_count")));
                }
            });
        } catch (Exception e) { e.printStackTrace(); }
        return memberList;
    }
}`
  },

  // スクレイピング (GAS)
  "scraping": {
    title: "ブログスクレイピング (GAS/TS)",
    fullDescription: "推しメンのブログ更新を毎分チェック。更新があれば即座にスプレッドシートへ記録し、通知を受け取れるように設計しました。",
    tech: ["TypeScript", "Google Apps Script", "clasp"],
    points: ["Cheerioを用いた効率的なパース処理", "TypeScriptによる型安全な実装", "トリガーによる定期実行の自動化"],
    images: ["/images/GAS/①.png"],
    link: "https://docs.google.com/spreadsheets/d/1iZeEO0-iypdu7CbrT96AMebsYGqjS4yGxOB4B7hc8Gg/edit?usp=sharing",
    github: "https://github.com/KHaruki1242/GAS_scraping",
    code: `// BlogScraping.ts - ブログの更新情報を抽出するコアロジック
function ParserScraping() {
  const url = "https://sakurazaka46.com/s/s46/diary/blog/list?ima=0000&ct=64";
  const response = UrlFetchApp.fetch(url);
  const content = response.getContentText();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("シート1");

  const topic_block = Parser.data(content).from('<ul class="com-blog-mainlist">').to('</ul>').build();
  const content_block = Parser.data(topic_block).from('<li class="sep-hr">').to('</li>').iterate();

  let newArticles = [];
  for (let i = 0; i < content_block.length; i++) {
    const articleHtml = content_block[i];
    const titlePartHtml = Parser.data(articleHtml).from('<h3 class="title">').to('</h3>').build();
    const urlPath = Parser.data(titlePartHtml).from('<a href="').to('">').build();
    
    if (urlPath && urlPath.includes("/detail/")) {
      const fullUrl = "https://sakurazaka46.com" + urlPath;
      newArticles.push([fullUrl]);
    }
  }
  if (newArticles.length > 0) {
    sheet.insertRowsAfter(1, newArticles.length);
    sheet.getRange(2, 1, newArticles.length, 1).setValues(newArticles);
  }
}`
  },

  // 家計簿 (VBA)
  "kakeibo-vba": {
    title: "家計簿 (VBA)",
    fullDescription: "Excel上で動作する家計簿ツールです。ユーザーフォームによる入力と、シートの自動複製機能を備えています。",
    tech: ["VBA", "Excel"],
    points: ["自作集計ロジックによる詳細な収支分析", "シートのバックアップとクリアの自動化"],
    images: ["/images/VBA/①.png"],
    github: "https://github.com/KHaruki1242/VBA_kakeibo",
    code: `' --- 1. データの入力ロジック ---
Sub KamokuInput_1()
    Dim Kingaku1 As Double: Kingaku1 = Range("B1").Value
    Dim Syushi1 As String: Syushi1 = Range("D1").Value
    Dim EndRow1 As Integer
    With ThisWorkbook.ActiveSheet
        EndRow1 = .Cells(.Rows.Count, 1).End(xlUp).Row + 1
        .Cells(EndRow1, 1).Value = Syushi1
        If Syushi1 = "収入" Then .Cells(EndRow1, 3).Value = Kingaku1 Else .Cells(EndRow1, 4).Value = Kingaku1
    End With
    Call Jisaku_SUM
End Sub

' --- 2. 自作ループ集計 ---
Sub Jisaku_SUM()
    Dim i As Integer, EndRow2 As Integer
    Dim Koteihi As Double, Hendouhi As Double
    With ThisWorkbook.ActiveSheet
        EndRow2 = .Cells(.Rows.Count, 1).End(xlUp).Row
        For i = 4 To EndRow2
            If .Cells(i, 2).Value = "固定費" Then Koteihi = Koteihi + .Cells(i, 4).Value
            If .Cells(i, 2).Value = "変動費" Then Hendouhi = Hendouhi + .Cells(i, 4).Value
        Next i
        .Range("G8") = Koteihi: .Range("G9") = Hendouhi
    End With
End Sub

' --- 3. シートの複製 ---
Sub SheetCopy1()
    Dim YearInput As Integer: YearInput = Sheets("入力").Range("I1").Value
    Dim MonthInput As Integer: MonthInput = Sheets("入力").Range("K1").Value
    Sheets("入力").Copy After:=Sheets("入力")
    ActiveSheet.Name = YearInput & "年" & MonthInput & "月"
    Sheets("入力").Range("A4:D10000").ClearContents
End Sub`
  }
};

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

        {/* 画像表示ロジック */}
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
                  <h2 className="text-xl font-semibold mb-3 border-l-4 border-gray-800 pl-3">DBテーブル設計 (MySQL)</h2>
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
            /* スケジューラーなど他のプロジェクトも複数枚あれば横スクロール */
            <>
              <h2 className="text-xl font-semibold mb-3 border-l-4 border-blue-500 pl-3">イメージギャラリー</h2>
              {project.images.length > 1 ? (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                  {project.images.map((img: string, i: number) => (
                    <div key={i} className="flex-shrink-0 w-80 bg-white p-2 border rounded-lg shadow-sm">
                      <img src={img} className="w-full h-auto rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-2 border rounded-lg shadow-sm">
                  <img src={project.images[0]} className="w-full h-auto rounded" />
                </div>
              )}
            </>
          )}
        </section>

        <section className="mb-10 text-gray-700">
          <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">概要</h2>
          <p className="leading-relaxed whitespace-pre-wrap">{project.fullDescription}</p>
        </section>

        <section className="mb-10 text-gray-700">
          <h2 className="text-xl font-semibold mb-3 border-b-2 border-blue-100 pb-1">こだわったポイント</h2>
          <ul className="list-disc list-inside space-y-2">
            {project.points.map((point: string, i: number) => <li key={i}>{point}</li>)}
          </ul>
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
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold hover:bg-black transition-all text-center shadow-lg">
              GitHubでコードを見る
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