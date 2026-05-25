using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class provinceExpansion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HighlightOrder",
                table: "Provinces",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Introduction",
                table: "Provinces",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IntroductionEn",
                table: "Provinces",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsHighlighted",
                table: "Provinces",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "KeyFeatures",
                table: "Provinces",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Overview",
                table: "Provinces",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "Provinces",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ContentEn",
                table: "Posts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "HighlightOrder",
                table: "Posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsHighlighted",
                table: "Posts",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedAt",
                table: "Posts",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RevisionNumber",
                table: "Posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "Posts",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsHighlighted",
                table: "MediaItems",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Tags",
                table: "MediaItems",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HighlightOrder",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "Introduction",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "IntroductionEn",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "IsHighlighted",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "KeyFeatures",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "Overview",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "Provinces");

            migrationBuilder.DropColumn(
                name: "ContentEn",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "HighlightOrder",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "IsHighlighted",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "LastUpdatedAt",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "RevisionNumber",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "IsHighlighted",
                table: "MediaItems");

            migrationBuilder.DropColumn(
                name: "Tags",
                table: "MediaItems");
        }
    }
}
