using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class LikeEntityAdded1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_AppUser_AppUserId",
                table: "Photos");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLike_AppUser_SourceUserId",
                table: "UserLike");

            migrationBuilder.DropForeignKey(
                name: "FK_UserLike_AppUser_TargetUserId",
                table: "UserLike");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserLike",
                table: "UserLike");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppUser",
                table: "AppUser");

            migrationBuilder.RenameTable(
                name: "UserLike",
                newName: "Likes");

            migrationBuilder.RenameTable(
                name: "AppUser",
                newName: "Users");

            migrationBuilder.RenameIndex(
                name: "IX_UserLike_TargetUserId",
                table: "Likes",
                newName: "IX_Likes_TargetUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Likes",
                table: "Likes",
                columns: new[] { "SourceUserId", "TargetUserId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_Users_SourceUserId",
                table: "Likes",
                column: "SourceUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_Users_TargetUserId",
                table: "Likes",
                column: "TargetUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Users_AppUserId",
                table: "Photos",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Likes_Users_SourceUserId",
                table: "Likes");

            migrationBuilder.DropForeignKey(
                name: "FK_Likes_Users_TargetUserId",
                table: "Likes");

            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Users_AppUserId",
                table: "Photos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Likes",
                table: "Likes");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "AppUser");

            migrationBuilder.RenameTable(
                name: "Likes",
                newName: "UserLike");

            migrationBuilder.RenameIndex(
                name: "IX_Likes_TargetUserId",
                table: "UserLike",
                newName: "IX_UserLike_TargetUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppUser",
                table: "AppUser",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserLike",
                table: "UserLike",
                columns: new[] { "SourceUserId", "TargetUserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_AppUser_AppUserId",
                table: "Photos",
                column: "AppUserId",
                principalTable: "AppUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLike_AppUser_SourceUserId",
                table: "UserLike",
                column: "SourceUserId",
                principalTable: "AppUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserLike_AppUser_TargetUserId",
                table: "UserLike",
                column: "TargetUserId",
                principalTable: "AppUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
