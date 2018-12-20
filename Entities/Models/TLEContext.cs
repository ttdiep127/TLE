using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Entities.Models
{
    public partial class TLEContext : DbContext
    {
        public TLEContext()
        {
        }

        public TLEContext(DbContextOptions<TLEContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Answers> Answers { get; set; }
        public virtual DbSet<Articles> Articles { get; set; }
        public virtual DbSet<ArticleViews> ArticleViews { get; set; }
        public virtual DbSet<ParagraphQuestions> ParagraphQuestions { get; set; }
        public virtual DbSet<Paragraphs> Paragraphs { get; set; }
        public virtual DbSet<Qtions> Qtions { get; set; }
        public virtual DbSet<Ratings> Ratings { get; set; }
        public virtual DbSet<TestQtions> TestQtions { get; set; }
        public virtual DbSet<TestResults> TestResults { get; set; }
        public virtual DbSet<Tests> Tests { get; set; }
        public virtual DbSet<TestTypes> TestTypes { get; set; }
        public virtual DbSet<Topics> Topics { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=TRANTIEUTHU;Database=TLE;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answers>(entity =>
            {
                entity.Property(e => e.UpdateDay).HasColumnType("datetime");

                entity.HasOne(d => d.Qtion)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.QtionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Answers_Qtions");

                entity.HasOne(d => d.TestResult)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.TestResultId)
                    .HasConstraintName("FK_Answers_TestResults");

                entity.HasOne(d => d.Topic)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.TopicId)
                    .HasConstraintName("FK_Answers_Topics");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Answers_Users");
            });

            modelBuilder.Entity<Articles>(entity =>
            {
                entity.Property(e => e.CreatedDay).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(2000);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.HasOne(d => d.Topic)
                    .WithMany(p => p.Articles)
                    .HasForeignKey(d => d.TopicId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Articles_Topics");
            });

            modelBuilder.Entity<ArticleViews>(entity =>
            {
                entity.HasKey(e => e.ArticleId);

                entity.Property(e => e.ArticleId).ValueGeneratedNever();

                entity.HasOne(d => d.Article)
                    .WithOne(p => p.ArticleViews)
                    .HasForeignKey<ArticleViews>(d => d.ArticleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ArticleViews_Articles");
            });

            modelBuilder.Entity<ParagraphQuestions>(entity =>
            {
                entity.HasKey(e => new { e.IdParagraph, e.Position });

                entity.HasOne(d => d.IdParagraphNavigation)
                    .WithMany(p => p.ParagraphQuestions)
                    .HasForeignKey(d => d.IdParagraph)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ParagraphQuestion_Paragraphs");

                entity.HasOne(d => d.IdQuestionNavigation)
                    .WithMany(p => p.ParagraphQuestions)
                    .HasForeignKey(d => d.IdQuestion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ParagraphQuestion_Qtions");
            });

            modelBuilder.Entity<Qtions>(entity =>
            {
                entity.Property(e => e.Answer1).HasMaxLength(1000);

                entity.Property(e => e.Answer2).HasMaxLength(1000);

                entity.Property(e => e.Answer3).HasMaxLength(1000);

                entity.Property(e => e.Answer4).HasMaxLength(1000);

                entity.Property(e => e.ContentQ).HasMaxLength(1000);

                entity.HasOne(d => d.Topic)
                    .WithMany(p => p.Qtions)
                    .HasForeignKey(d => d.TopicId)
                    .HasConstraintName("FK_Qtions_Topics");
            });

            modelBuilder.Entity<Ratings>(entity =>
            {
                entity.Property(e => e.TestGuid).HasMaxLength(50);

                entity.Property(e => e.UpdateDay).HasColumnType("datetime");

                entity.HasOne(d => d.Topic)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.TopicId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ratings_Topics1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ratings_Users");
            });

            modelBuilder.Entity<TestQtions>(entity =>
            {
                entity.HasKey(e => new { e.TestId, e.ItemId, e.IsPara });

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.TestQtions)
                    .HasForeignKey(d => d.ItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TestQtions_Qtions");

                entity.HasOne(d => d.Test)
                    .WithMany(p => p.TestQtions)
                    .HasForeignKey(d => d.TestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TestQtions_Tests");
            });

            modelBuilder.Entity<TestResults>(entity =>
            {
                entity.Property(e => e.ExamedAt).HasColumnType("datetime");

                entity.Property(e => e.GuidId)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Test)
                    .WithMany(p => p.TestResults)
                    .HasForeignKey(d => d.TestId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TestResults_Tests1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TestResults)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TestResults_Users");
            });

            modelBuilder.Entity<Tests>(entity =>
            {
                entity.Property(e => e.CreatedAt).HasMaxLength(10);

                entity.Property(e => e.CreatedBy).HasMaxLength(10);

                entity.Property(e => e.Title).HasMaxLength(500);

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Tests)
                    .HasForeignKey(d => d.TypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tests_Types");
            });

            modelBuilder.Entity<TestTypes>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(500);
            });

            modelBuilder.Entity<Topics>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(500);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.EmailAddress)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.FirstName).HasMaxLength(225);

                entity.Property(e => e.FullName).HasMaxLength(500);

                entity.Property(e => e.JoinedDate).HasColumnType("datetime");

                entity.Property(e => e.LastName).HasMaxLength(225);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(225);

                entity.Property(e => e.TokenCreatedDate).HasColumnType("datetime");
            });
        }
    }
}
