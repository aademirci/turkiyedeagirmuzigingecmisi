using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UserAnecdoteAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserAnecdotes",
                columns: table => new
                {
                    AppUserId = table.Column<string>(nullable: false),
                    AnecdoteId = table.Column<int>(nullable: false),
                    DateFaved = table.Column<DateTime>(nullable: false),
                    IsOwner = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAnecdotes", x => new { x.AppUserId, x.AnecdoteId });
                    table.ForeignKey(
                        name: "FK_UserAnecdotes_Anecdotes_AnecdoteId",
                        column: x => x.AnecdoteId,
                        principalTable: "Anecdotes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAnecdotes_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAnecdotes_AnecdoteId",
                table: "UserAnecdotes",
                column: "AnecdoteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserAnecdotes");
        }
    }
}
