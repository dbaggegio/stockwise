                    <CardDescription>
                      Digite um username do GitHub para ver seus repositórios e commits
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["facebook", "microsoft", "google", "vercel", "nextjs"].map((user) => (
                        <Button
                          key={user}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setGithubUsername(user);
                            handleGithubSearch();
                          }}
                        >
                          @{user}
                        </Button>
                      ))}
                    </div></content>
<parameter name="path">src/app/page.tsx